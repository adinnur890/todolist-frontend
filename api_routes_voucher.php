// Tambahkan routes ini ke file routes/api.php di Laravel backend

// Voucher routes (protected by auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/vouchers/check', [VoucherController::class, 'checkVoucher']);
    Route::post('/vouchers/redeem', [VoucherController::class, 'redeemVoucher']);
});
