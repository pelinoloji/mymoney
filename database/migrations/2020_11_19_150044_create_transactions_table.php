<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('transactions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('currency_id');
      $table->unsignedBigInteger('tag_id');
      $table->float('amount', 8, 2);
      $table->string('tag');
      $table->boolean('expense');
      $table->string('currency');
      $table->date('date');
      $table->timestamps();

      $table->foreign('currency_id')
        ->references('id')
        ->on('currencies')
        ->onDelete('cascade');

      $table->foreign('tag_id')
        ->references('id')
        ->on('tags')
        ->onDelete('cascade');
    });



    Schema::create('currency_transactions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('currency_id');
      $table->unsignedBigInteger('transaction_id');
      $table->timestamps();

      $table->unique(['transaction_id', 'currency_id']);

      $table->foreign('transaction_id')->references('id')->on('transactions')->onDelete('cascade');
      $table->foreign('currency_id')->references('id')->on('currencies')->onDelete('cascade');
    });

    Schema::create('transaction_tags', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('tag_id');
      $table->unsignedBigInteger('transaction_id');
      $table->timestamps();

      $table->unique(['transaction_id', 'tag_id']);

      $table->foreign('transaction_id')->references('id')->on('transactions')->onDelete('cascade');
      $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('transactions');
  }
}
