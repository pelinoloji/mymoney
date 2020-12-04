<?php

use App\Models\Currency;
use App\Models\Tag;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('app');
});

// Route::get('/transactions/{id}', function () {
//   return view('app');
// });


Route::prefix('api')->group(function () {
  Route::get('transactions', 'App\Http\Controllers\TransactionsController@index')->name('transactions.index');
  Route::post('transactions', 'App\Http\Controllers\TransactionsController@store')->name('transactions.store');
  Route::get('transactions/{id}/edit', 'App\Http\Controllers\TransactionsController@edit')->name('transactions.edit');
  Route::put('transactions/{id}', 'App\Http\Controllers\TransactionsController@update')->name('transactions.update');
  Route::delete('transactions/{id}', 'App\Http\Controllers\TransactionsController@destroy')->name('transactions.destroy');
});


// Route::get('test', function () {

//   $transaction = Transaction::with('currency', 'tag')->get();
//   $tag = new Tag();
//   $tag->name = uniqid('testing-');
//   $tag->save();

//   $transaction->tag()->sync([$tag->id]);

//   $transaction->load('tag');

//   dd($transaction->toSql());
//   // $transaction->load('currencies');
//   // $transaction->currency_id = 1;
//   // $transaction->save();
//   // Currency::create(['name' => 'USD']);

//   // return $transaction;
//   // return Currency::all();

//   return $transaction;
// });
