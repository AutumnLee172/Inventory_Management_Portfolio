<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;
use App\Models\Receive;

class ReceivesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $receives = Receive::all();
        return response()->json([
            'data' => $receives
        ]);
    }
}
