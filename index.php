<?php
require_once 'includes/db.php';
require_once 'includes/header.php';

// Fetch products
try {
    $stmt = $pdo->query("SELECT * FROM products WHERE status = 'ACTIVE' ORDER BY createdAt DESC LIMIT 12");
    $products = $stmt->fetchAll();
} catch (PDOException $e) {
    $products = [];
}
?>

<div class="text-center space-y-6 mb-20">
    <h1 class="text-6xl font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
        Everything you need,<br><span class="text-cyan-400">Simplified.</span>
    </h1>
    <p class="text-white/60 text-xl max-w-2xl mx-auto">
        Join the most advanced multi-vendor marketplace built for the next generation of commerce.
    </p>
    <div class="flex justify-center gap-4 pt-4">
        <a href="auth/register.php" class="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition">Explore Now</a>
        <a href="#" class="border border-white/10 px-8 py-3 rounded-full font-bold text-lg hover:bg-white/5 transition">Learn More</a>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <?php foreach ($products as $product): ?>
        <div class="glass border border-white/10 rounded-2xl p-4 group hover:border-cyan-500/50 transition">
            <div class="aspect-square bg-white/5 rounded-xl mb-4 overflow-hidden">
                <?php if($product['image']): ?>
                    <img src="<?php echo htmlspecialchars($product['image']); ?>" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                <?php else: ?>
                    <div class="w-full h-full flex items-center justify-center text-white/10">No Image</div>
                <?php endif; ?>
            </div>
            <h3 class="font-bold text-lg"><?php echo htmlspecialchars($product['name']); ?></h3>
            <p class="text-white/50 text-sm line-clamp-2 mt-1"><?php echo htmlspecialchars($product['description']); ?></p>
            <div class="mt-4 flex justify-between items-center">
                <span class="text-cyan-400 font-black text-xl">$<?php echo number_format($product['price'], 2); ?></span>
                <button class="bg-cyan-500 hover:bg-cyan-400 p-2 rounded-lg text-black transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </button>
            </div>
        </div>
    <?php endforeach; ?>
    
    <?php if(empty($products)): ?>
        <div class="col-span-full text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p class="text-white/40 italic">No products available yet. Be the first to list one!</p>
        </div>
    <?php endif; ?>
</div>

<?php require_once 'includes/footer.php'; ?>
