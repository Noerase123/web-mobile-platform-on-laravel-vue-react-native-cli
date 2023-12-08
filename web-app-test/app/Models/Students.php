<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    // use HasFactory;
    protected $table = 'students';
    public $primaryKey = 'id';
    protected $fillable = [
        'firstName',
        'middleName',
        'lastName',
        'birthday',
        'studentID',
        'parentFirstName',
        'parentMiddleName',
        'parentLastName',
        'email',
        'contactNum',
        'relationship',
        'status'
    ];
}
