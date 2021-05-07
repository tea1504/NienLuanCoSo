<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        // $request->validate([
        //     'username' => 'required',
        //     'password' => 'required',
        //     'device_name' => 'required',
        // ]);

        $user = Staff::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['Tài khoản hoặc mật khẩu bị sai.'],
            ]);
        }
        $token = ['phucvu'];
        if ($user->department_id == 1)
            $token = ['quanly'];
        else if ($user->department_id == 2)
            $token = ['thungan'];
        else if ($user->department_id == 3)
            $token = ['bep'];
        return $user->createToken($request->device_name, $token)->plainTextToken;
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        return $request->user()->tokens()->delete();
    }
}
