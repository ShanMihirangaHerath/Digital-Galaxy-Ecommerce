<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SignupRequest;
use App\Models\User;

class AuthController extends Controller{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        
        /** @var User $user*/ 
        $user = User::create(
          [
            'first_name'=>$data["first_name"],
            'last_name'=>$data["last_name"],
            'email'=>$data["email"],
            'password'=>bcrypt($data['password']),
          ]  
        );

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
}