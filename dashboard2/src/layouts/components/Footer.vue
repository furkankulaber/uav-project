<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center" />
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      &copy;
      {{ new Date().getFullYear() }}
      Copyright<a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >UAV Rental Project</a>
    </span>
  </div>
</template>
