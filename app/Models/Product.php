<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'price', 'discount', 'discounted_price',
        'category', 'short_description', 'details', 'images',
    ];

    protected $casts = [
        'images' => 'array',
    ];
}