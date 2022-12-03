<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales')->insert([
            'customer_id' => '1',
            'customer_name' => 'Sample',
            'total' => 30,
            'discount' => 30,
            'net' => 30,
            'deposit' => 30,
            'balance' => 30,
            'transaction_id' => 'S00001',

        ]);
    }
}
