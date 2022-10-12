<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Jack',
            'password' => '$2y$10$48BIfgNV8y/uigMOgTW/cOp/uWuD9UBSC0aCP8JaYnvhiwqvw2Uwy',
            'email' => 'jaclight.enterprise@gmail.com',

        ]);
    }
}
