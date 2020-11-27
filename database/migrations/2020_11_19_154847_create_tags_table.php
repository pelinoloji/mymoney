<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('tags', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('tag_id')->unique();
      $table->string('name')->unique();

      $table->timestamps();
    });

    Schema::create('transaction_tags', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('transaction_id');
      $table->unsignedBigInteger('tag_id');
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

    Schema::dropIfExists('transaction_tags');
    Schema::dropIfExists('tags');
  }
}
