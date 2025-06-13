<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('12345678'), // 🔐 Change this in production
                'role' => 'admin',
                'phone' => '08012345678',
                'billing_address' => '123 Admin Street, Admin City, Admin State, 12345',
                'profile_image' => null,
            ]
        );
    }
}
