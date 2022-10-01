<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_number',
        'description',
        'quantity',
        'original_price',
        'selling_price',
        'image',
        'updated_at'
    ];
}
