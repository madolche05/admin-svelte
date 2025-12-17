<script lang="ts">
    // Mock data
    let items = [
        { id: 1, name: 'Laptop Gaming', category: 'Elektronik', price: 15000000, stock: 5, image: 'https://placehold.co/50' },
        { id: 2, name: 'Meja Kerja', category: 'Furniture', price: 1200000, stock: 20, image: 'https://placehold.co/50' },
        { id: 3, name: 'Kemeja Flanel', category: 'Pakaian', price: 250000, stock: 50, image: 'https://placehold.co/50' },
        { id: 4, name: 'Headset Bluetooth', category: 'Elektronik', price: 500000, stock: 2, image: 'https://placehold.co/50' },
        { id: 5, name: 'Sepatu Sneakers', category: 'Pakaian', price: 750000, stock: 0, image: 'https://placehold.co/50' },
        { id: 6, name: 'Kopi Arabika', category: 'Makanan', price: 150000, stock: 100, image: 'https://placehold.co/50' },
        { id: 7, name: 'Action Figure', category: 'Mainan', price: 450000, stock: 12, image: 'https://placehold.co/50' },
    ];

    function getStockStatus(stock: number) {
        if (stock === 0) return { text: 'Habis', color: 'badge-error' };
        if (stock < 10) return { text: 'Menipis', color: 'badge-warning' };
        return { text: 'Tersedia', color: 'badge-success' };
    }

    function formatRupiah(amount: number) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    }
</script>

<div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Inventori Barang</h1>
    <button class="btn btn-primary text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Barang
    </button>
</div>

<div class="overflow-x-auto bg-base-100 rounded-lg shadow-sm border border-base-200">
    <table class="table w-full">
        <!-- head -->
        <thead class="bg-base-200">
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Barang</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                {@const status = getStockStatus(item.stock)}
                <tr class="hover">
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt={item.name} />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{item.name}</div>
                                <div class="text-sm opacity-50">ID: {item.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>{item.category}</td>
                    <td>{formatRupiah(item.price)}</td>
                    <td>{item.stock}</td>
                    <td>
                        <span class="badge {status.color} badge-sm gap-2">
                            {status.text}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-ghost btn-xs">Edit</button>
                        <button class="btn btn-ghost btn-xs text-error">Hapus</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="flex justify-center mt-6">
    <div class="join">
        <button class="join-item btn">«</button>
        <button class="join-item btn btn-active">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">»</button>
    </div>
</div>
