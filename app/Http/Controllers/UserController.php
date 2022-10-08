<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

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

    public function getUser(){
        $user = User::select('name as username', 'email')->where('id',Auth::id())->first();

        return response()->json([
            'data' => $user
        ]);
    }

    public function update(Request $request){
        $user = User::find(Auth::id());
        $user->name = ($request->has('username') && !empty($request->get('username'))) ? $request->get('username') : '';
        $user->password = bcrypt($request->get('password'));
        $user->save();

        return response()->json([
            'data' => $user
        ]);
    }
}
