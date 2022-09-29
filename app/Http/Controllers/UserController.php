<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function show( Request $request ) {
        $user = $request->user();

        return response()->json([
            'data' => $request->user()
        ]);
    }
}
