document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('revenueChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9'],
                datasets: [
                    {
                        label: 'Tiền Phòng (Triệu VNĐ)',
                        data: [32, 33, 34, 34, 35, 35],
                        backgroundColor: '#2563eb',
                        borderRadius: 4
                    },
                    {
                        label: 'Tiền Dịch Vụ (Triệu VNĐ)',
                        data: [9.5, 10, 10.2, 10.1, 10.9, 10.7],
                        backgroundColor: '#38bdf8',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { 
                        stacked: true,
                        grid: { display: false }
                    },
                    y: { 
                        stacked: true,
                        ticks: {
                            callback: function(value) {
                                return value + ' Tr';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
});

function exportData() {
    alert("Hệ thống đang xuất file báo cáo doanh thu dưới dạng Excel (.xlsx)...");
}