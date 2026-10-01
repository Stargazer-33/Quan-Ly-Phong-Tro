(() => {
  const tableByEntity = {
    staff: "staff_members", rooms: "rooms", tenants: "tenants", contracts: "rental_contracts",
    services: "service_prices", readings: "utility_readings", invoices: "invoices",
    expenses: "expenses", incidents: "incidents"
  };

  function assertSuccess(result) {
    if (result.error) throw result.error;
    return result.data;
  }

  async function invokeProvisionMember(body) {
    const { data, error } = await window.supabaseClient.functions.invoke("provision-member", { body });
    if (error) {
      let message = error.message;
      try {
        const response = error.context;
        if (response?.clone) {
          const details = await response.clone().json();
          message = details.error || message;
        }
      } catch { /* Keep the Functions SDK message when the body is not JSON. */ }
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function propertyForUser(user, role) {
    if (role === "owner") {
      const { data, error } = await window.supabaseClient.from("properties")
        .select("id,name,address").eq("owner_id", user.id).limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data;
      const created = await window.supabaseClient.from("properties")
        .insert({ owner_id: user.id, name: "Nhà trọ của tôi" }).select("id,name,address").single();
      return assertSuccess(created);
    }
    const { data, error } = await window.supabaseClient.from("property_members")
      .select("property_id, properties(id,name,address)")
      .eq("user_id", user.id).eq("role", "manager").limit(1).maybeSingle();
    if (error) throw error;
    if (!data?.properties) throw new Error("Tài khoản quản lý chưa được gán cơ sở.");
    return data.properties;
  }

  async function load(propertyId) {
    // Payments are loaded separately because they are append-only records,
    // not editable entities exposed through tableByEntity.
    const tables = [...Object.values(tableByEntity), "payments"];
    const results = await Promise.all(tables.map((table) =>
      window.supabaseClient.from(table).select("*").eq("property_id", propertyId)
    ));
    const loaded = {};
    tables.forEach((table, index) => { loaded[table] = assertSuccess(results[index]) || []; });

    const roomsById = new Map(loaded.rooms.map((room) => [room.id, room]));
    const tenantsById = new Map(loaded.tenants.map((tenant) => [tenant.id, tenant]));
    const paidByInvoice = new Map();
    loaded.payments.forEach((payment) => {
      paidByInvoice.set(payment.invoice_id, (paidByInvoice.get(payment.invoice_id) || 0) + Number(payment.amount));
    });

    return {
      staff: loaded.staff_members.map((x) => ({ id: x.id, name: x.full_name, phone: x.phone, email: x.email,
        position: x.position, area: x.area, status: x.status, authUserId: x.auth_user_id })),
      rooms: loaded.rooms.map((x) => ({ id: x.id, code: x.code, name: x.name, floor: x.floor,
        price: Number(x.monthly_rent), area: Number(x.area), status: x.status })),
      tenants: loaded.tenants.map((x) => ({ id: x.id, name: x.full_name, phone: x.phone, identity: x.identity_no,
        email: x.email || "", roomCode: roomsById.get(x.room_id)?.code || "", status: x.status, authUserId: x.auth_user_id })),
      contracts: loaded.rental_contracts.map((x) => ({ id: x.id, code: x.code,
        roomCode: roomsById.get(x.room_id)?.code || "", tenantName: tenantsById.get(x.tenant_id)?.full_name || x.tenant_name || "",
        deposit: Number(x.deposit), start: x.start_date, end: x.end_date, status: x.status })),
      services: loaded.service_prices.map((x) => ({ id: x.id, name: x.name, unit: x.unit, price: Number(x.price) })),
      readings: loaded.utility_readings.map((x) => ({ id: x.id, roomCode: roomsById.get(x.room_id)?.code || "",
        period: x.period, electricityPrevious: Number(x.electricity_previous), electricityCurrent: Number(x.electricity_current),
        waterPrevious: Number(x.water_previous), waterCurrent: Number(x.water_current) })),
      invoices: loaded.invoices.map((x) => ({ id: x.id, code: x.code, period: x.period,
        roomCode: roomsById.get(x.room_id)?.code || "", tenantName: tenantsById.get(x.tenant_id)?.full_name || x.tenant_name || "",
        rent: Number(x.rent_amount), electricUsage: Number(x.electricity_usage), electricCost: Number(x.electricity_amount),
        waterUsage: Number(x.water_usage), waterCost: Number(x.water_amount), serviceCost: Number(x.service_amount),
        total: Number(x.total_amount), paid: paidByInvoice.get(x.id) || 0, dueDate: x.due_date || "" })),
      payments: loaded.payments.map((x) => ({ id: x.id, invoiceId: x.invoice_id, amount: Number(x.amount),
        paidAt: x.paid_at, method: x.method, note: x.note })),
      expenses: loaded.expenses.map((x) => ({ id: x.id, date: x.spent_on, name: x.name, category: x.category,
        roomCode: x.room_code, amount: Number(x.amount), note: x.note })),
      incidents: loaded.incidents.map((x) => ({ id: x.id, code: x.code, roomCode: roomsById.get(x.room_id)?.code || "",
        tenantId: x.tenant_id, title: x.title, category: x.category, severity: x.severity, status: x.status,
        description: x.description, date: x.created_at, reportedBy: x.reported_by }))
    };
  }

  async function save(propertyId, userId, data) {
    const roomsByCode = new Map((data.rooms || []).map((x) => [x.code, x]));
    const tenantsByName = new Map((data.tenants || []).map((x) => [x.name, x]));
    const rows = {
      rooms: (data.rooms || []).map((x) => ({ property_id: propertyId, id: x.id, code: x.code, name: x.name,
        floor: x.floor || "", monthly_rent: Number(x.price || 0), area: Number(x.area || 0), status: x.status || "available" })),
      tenants: (data.tenants || []).map((x) => ({ property_id: propertyId, id: x.id, full_name: x.name,
        phone: x.phone || "", identity_no: x.identity || "", email: x.email || null,
        room_id: roomsByCode.get(x.roomCode)?.id || null, status: x.status || "active" })),
      staff_members: (data.staff || []).map((x) => ({ property_id: propertyId, id: x.id, full_name: x.name,
        phone: x.phone || "", email: x.email || "", position: x.position || "", area: x.area || "", status: x.status || "active" })),
      rental_contracts: (data.contracts || []).map((x) => ({ property_id: propertyId, id: x.id, code: x.code || x.id,
        room_id: roomsByCode.get(x.roomCode)?.id, tenant_id: tenantsByName.get(x.tenantName)?.id || null,
        tenant_name: x.tenantName || "", deposit: Number(x.deposit || 0), start_date: x.start, end_date: x.end, status: x.status || "active" })),
      service_prices: (data.services || []).map((x) => ({ property_id: propertyId, id: x.id, name: x.name,
        unit: x.unit, price: Number(x.price || 0) })),
      utility_readings: (data.readings || []).filter((x) => roomsByCode.has(x.roomCode)).map((x) => ({
        property_id: propertyId, id: x.id, room_id: roomsByCode.get(x.roomCode).id, period: x.period,
        electricity_previous: Number(x.electricityPrevious || 0), electricity_current: Number(x.electricityCurrent || 0),
        water_previous: Number(x.waterPrevious || 0), water_current: Number(x.waterCurrent || 0)
      })),
      invoices: (data.invoices || []).map((x) => ({ property_id: propertyId, id: x.id, code: x.code || x.id,
        room_id: roomsByCode.get(x.roomCode)?.id, tenant_id: tenantsByName.get(x.tenantName)?.id || null,
        tenant_name: x.tenantName || "", period: x.period, rent_amount: Number(x.rent || 0),
        electricity_usage: Number(x.electricUsage || 0), electricity_amount: Number(x.electricCost || 0),
        water_usage: Number(x.waterUsage || 0), water_amount: Number(x.waterCost || 0),
        service_amount: Number(x.serviceCost || 0), total_amount: Number(x.total || 0), due_date: x.dueDate || null })),
      expenses: (data.expenses || []).filter((x) => x.date).map((x) => ({ property_id: propertyId, id: x.id,
        spent_on: x.date, name: x.name, category: x.category || "Khác", room_code: x.roomCode || "",
        amount: Number(x.amount || 0), note: x.note || "" })),
      incidents: (data.incidents || []).filter((x) => roomsByCode.has(x.roomCode)).map((x) => ({
        property_id: propertyId, id: x.id, code: x.code || x.id, room_id: roomsByCode.get(x.roomCode).id,
        tenant_id: x.tenantId || null, title: x.title, category: x.category || "Khác", severity: x.severity || "medium",
        status: x.status || "new", description: x.description || "", reported_by: x.reportedBy || userId
      }))
    };

    const sequence = ["rooms", "tenants", "staff_members", "rental_contracts", "service_prices",
      "utility_readings", "invoices", "expenses", "incidents"];
    for (const table of sequence) {
      if (!rows[table].length) continue;
      const result = await window.supabaseClient.from(table).upsert(rows[table], { onConflict: "property_id,id" });
      if (result.error) throw result.error;
    }
  }

  async function remove(propertyId, entity, id) {
    const table = tableByEntity[entity];
    if (!table) throw new Error("Loại dữ liệu không hợp lệ.");
    const { error } = await window.supabaseClient.from(table).delete()
      .eq("property_id", propertyId).eq("id", id);
    if (error) throw error;
  }

  async function isInitialized(propertyId) {
    const { data, error } = await window.supabaseClient.from("property_bootstrap")
      .select("property_id").eq("property_id", propertyId).maybeSingle();
    if (error) throw error;
    return Boolean(data);
  }

  async function markInitialized(propertyId) {
    const { error } = await window.supabaseClient.from("property_bootstrap").insert({ property_id: propertyId });
    if (error && error.code !== "23505") throw error;
  }

  async function addPayment(propertyId, payment) {
    const { data, error } = await window.supabaseClient.from("payments").insert({
      property_id: propertyId, id: payment.id, invoice_id: payment.invoiceId,
      amount: payment.amount, paid_at: payment.paidAt || new Date().toISOString(),
      method: payment.method || "cash", note: payment.note || ""
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function inviteMember(propertyId, entity, recordId, email, fullName) {
    return invokeProvisionMember({ property_id: propertyId, entity, record_id: recordId,
      email, full_name: fullName, redirect_to: new URL("index.html", window.location.href).href });
  }

  async function setManagerEnabled(propertyId, recordId, enabled) {
    return invokeProvisionMember({ action: enabled ? "enable" : "disable", property_id: propertyId,
      entity: "staff_members", record_id: recordId });
  }

  async function resendMemberInvite(propertyId, entity, recordId) {
    return invokeProvisionMember({ action: "resend", property_id: propertyId, entity, record_id: recordId,
      redirect_to: new URL("index.html", window.location.href).href });
  }

  window.rentalRepository = { propertyForUser, load, save, remove, addPayment, inviteMember, resendMemberInvite, setManagerEnabled, isInitialized, markInitialized };
})();
