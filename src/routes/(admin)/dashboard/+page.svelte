<script lang="ts">
    import Chart from '$lib/components/Chart.svelte';

    const stats = [
        { title: 'Total Barang', value: '1,204', desc: '↗︎ 40 (2%)', icon: '📦', color: 'text-primary' },
        { title: 'Stok Menipis', value: '15', desc: '↘︎ 5 (12%)', icon: '⚠️', color: 'text-warning' },
        { title: 'Total Nilai', value: 'Rp 1.2M', desc: '↗︎ 120jt (5%)', icon: '💰', color: 'text-success' },
        { title: 'Kategori', value: '8', desc: 'Tetap', icon: '🏷️', color: 'text-secondary' },
    ];

    const barData = {
        labels: ['Elektronik', 'Furniture', 'Pakaian', 'Makanan', 'Mainan'],
        datasets: [{
            label: 'Stok Barang',
            data: [300, 150, 400, 200, 100],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const pieData = {
        labels: ['Elektronik', 'Furniture', 'Pakaian', 'Makanan', 'Mainan'],
        datasets: [{
            data: [30, 15, 40, 20, 10],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF'
            ],
            borderWidth: 1
        }]
    };
</script>

<h1 class="text-3xl font-bold mb-6">Dashboard</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {#each stats as stat}
        <div class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="card-title text-base text-gray-500">{stat.title}</h2>
                    <span class="text-2xl {stat.color}">{stat.icon}</span>
                </div>
                <p class="text-3xl font-bold mt-2">{stat.value}</p>
                <p class="text-xs text-gray-400 mt-1">{stat.desc}</p>
            </div>
        </div>
    {/each}
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body">
            <h2 class="card-title mb-4">Level Stok per Kategori</h2>
            <div class="h-64 w-full">
                <Chart type="bar" data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
        </div>
    </div>
    <div class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body">
            <h2 class="card-title mb-4">Distribusi Kategori</h2>
             <div class="h-64 w-full flex justify-center">
                <Chart type="doughnut" data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    </div>
</div>