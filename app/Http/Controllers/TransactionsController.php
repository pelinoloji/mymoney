<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Tag;

class TransactionsController extends Controller
{

  public function index(Transaction $transaction)
  {
    $transaction = Transaction::orderByDesc('id')->get();
    return $transaction;
  }

  public function create()
  {
    //
  }

  public function update(Transaction $transaction)
  // public function update(Request $request)
  {
    $transaction->update($this->validateTransactions());
    // Transaction::where('id', $transaction)->update($transaction);
    return redirect('/');
  }

  public function store(Request $request)
  {
    $this->validateTransactions();

    $transaction = new Transaction();

    $transaction->amount = $request->get('amount');
    $transaction->tag = $request->get('tag');
    $transaction->currency = $request->get('currency_id');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');
    $transaction->tag_id = 1;
    $transaction->currency_id = 1;

    $transaction->save();
    $transaction->tags()->attach(request('tags'));
    $transaction->currencies()->attach(request('currencies'));
    return $transaction;
  }

  public function edit(Transaction $transaction)
  {

    return $transaction;
  }

  public function delete(Transaction $transaction)
  {
    return $transaction->delete();
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
