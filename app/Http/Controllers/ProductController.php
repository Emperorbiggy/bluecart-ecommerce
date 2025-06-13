<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'category' => 'required|string',
            'shortDescription' => 'nullable|string',
            'details' => 'nullable|string',
            'imageInputType' => 'required|in:url,upload',
        ]);

        $imageUrls = [];

        if ($request->imageInputType === 'url') {
            $imageUrls = collect($request->input('images'))
                ->filter(fn($url) => filter_var($url, FILTER_VALIDATE_URL))
                ->values()
                ->toArray();
        } elseif ($request->imageInputType === 'upload') {
            if ($request->hasFile('uploadedImages')) {
                foreach ($request->file('uploadedImages') as $image) {
                    if ($image && $image->isValid()) {
                        $path = $image->store('products', 'public'); // stored in storage/app/public/products
                        $imageUrls[] = Storage::url($path); // generates /storage/products/filename
                    }
                }
            }
        }

        $discount = $validated['discount'] ?? 0;
        $discountedPrice = $validated['price'] - ($validated['price'] * $discount / 100);

        $product = Product::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'discount' => $discount,
            'discounted_price' => $discountedPrice,
            'category' => $validated['category'],
            'short_description' => $validated['shortDescription'] ?? '',
            'details' => $validated['details'] ?? '',
            'images' => json_encode($imageUrls),
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }
}
