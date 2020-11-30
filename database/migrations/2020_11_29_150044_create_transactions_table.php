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
      // $table->engine = 'InnoDB';
      $table->id();
      $table->unsignedBigInteger('tag_id')->nullable();
      $table->unsignedBigInteger('currency_id')->nullable();

      $table->string('tag');
      $table->string('currency');

      $table->float('amount', 8, 2);
      $table->boolean('expense');
      $table->date('date');
      $table->timestamps();

      // $table->foreign('tag_id')
      //   ->references('id')
      //   ->on('tags')
      //   ->onDelete('cascade');

      $table->foreign('currency_id')
        ->references('id')
        ->on('currencies')
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
