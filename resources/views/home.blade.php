@extends('layouts.app')

@push('html-class') has-spinner-active @endpush

@push('head-scripts')
    <script src="{{ mix('js/app.js') }}" defer></script>
@endpush

@push('bottom')
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
@endpush
