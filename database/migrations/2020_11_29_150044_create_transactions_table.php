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
      $table->unsignedBigInteger('currency_id')->nullable();
      $table->unsignedBigInteger('tag_id')->nullable();
      $table->float('amount', 8, 2);
      $table->boolean('expense');
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
