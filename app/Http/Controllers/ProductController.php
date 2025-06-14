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
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'status' => 'success',
            'products' => $products
        ]);
    }
    public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'category' => 'nullable|string|max:255',
        'short_description' => 'nullable|string|max:500',
        'details' => 'nullable|string',
        'discount' => 'nullable|numeric|min:0|max:100',
        'images' => 'nullable|array',
        'images.*' => 'nullable|url',
    ]);

    $product->name = $validated['name'];
    $product->price = $validated['price'];
    $product->category = $validated['category'] ?? $product->category;
    $product->short_description = $validated['short_description'] ?? '';
    $product->details = $validated['details'] ?? '';
    $product->discount = $validated['discount'] ?? 0;

    if (isset($validated['images'])) {
        $product->images = json_encode($validated['images']);
    }

    $product->save();

    return response()->json([
        'message' => 'Product updated successfully',
        'product' => $product,
    ]);
}
 public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.',
            ], 404);
        }

        return response()->json([
            'product' => $product,
        ]);
    }
     public function getRelatedProducts($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $relatedProducts = Product::where('category', $product->category)
            ->where('id', '!=', $product->id)
            ->take(3)
            ->get();

        return response()->json($relatedProducts);
    }
}


