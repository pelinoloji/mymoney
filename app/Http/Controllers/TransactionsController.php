<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Tag;

class TransactionsController extends Controller
{

  public function index(Transaction $transaction)
  {
    // echo 'Hello Pelin';
    $transaction = Transaction::orderByDesc('id')->get();
    // $transaction = Transaction::all();
    // $transaction = Transaction::table('amount')->count();
    return response()->json($transaction);
  }

  public function update(Transaction $transaction, $id, Request $request)
  {
    $transaction->update($this->validateTransactions());

    $transaction = Transaction::find($id);
    $transaction->name = $request->get('name');
    $transaction->tag = $request->get('tag');
    $transaction->currency = $request->get('currency');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');
    $transaction->save();

    return response()->json('Successfully Updated');
  }


  public function store(Request $request)
  {
    $this->validateTransactions();
    $transaction = new Transaction();
    $transaction->amount = $request->get('amount');
    $transaction->tag = $request->get('tag');
    $transaction->currency = $request->get('currency');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');
    // $transaction->tag_id = 1;
    // $transaction->currency_id = 1;
    $transaction->save();
    // $transaction->tag()->attach(request('tags'));
    // $transaction->currencY()->attach(request('currencies'));
    return response()->json('Successfully added');
  }

  // public function edit(Transaction $transaction, $id)
  // {
  //   $transaction = Transaction::find($id);
  //   return response()->json($transaction);
  // }

  public function destroy($id)
  {
    $transaction = Transaction::findOrFail($id)->delete();
    return response()->json('Successfully Deleted');
  }

  public function validateTransactions()
  {
    return request()->validate([
      'amount' => 'required',
      'tag' => 'required',
      'currency' => 'required',
      'expense' => 'required',
      // 'date' => 'required'
    ]);
  }
}
