<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;

class AuthController extends Controller
{
  public function signup(SignupRequest $request)
  {
    $data = $request->validated();

    /** @var User $user*/
    $user = User::create(
      [
        'first_name' => $data["first_name"],
        'last_name' => $data["last_name"],
        'email' => $data["email"],
        'password' => bcrypt($data['password']),
      ]
    );

    $token = $user->createToken('main')->plainTextToken;
    return response(compact('user', 'token'));
  }

  public function login(LoginRequest $request)
  {
    $data = $request->validated();
    ['email' => $email, 'password' => $password, 'remember' => $remember] = $data;
    $credentials = ['email' => $email, 'password' => $password];

    if (!Auth::attempt($credentials, $remember)) {
      return response([
        'message' => 'Provided email or password is incorrect'
      ], 422);
    }
    /** @var User $user */
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;

    return response(compact('user', 'token'), 200);
  }
}