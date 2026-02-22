  // Function to switch to edit mode
  function editItem(itemId) {
    // Hide view mode elements
    document.getElementById(`title-${itemId}`).style.display = 'none';
    document.getElementById(`edit-btn-${itemId}`).style.display = 'none';
    
    // Show edit mode elements
    const editForm = document.getElementById(`edit-form-${itemId}`);
    editForm.style.display = 'flex';
    
    // Focus on input
    document.getElementById(`input-${itemId}`).focus();
  }

  // Add keyboard support (Enter to save, Escape to cancel)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Find any visible edit forms and hide them
      document.querySelectorAll('[id^="edit-form-"]').forEach(form => {
        if (form.style.display === 'flex') {
          const itemId = form.id.replace('edit-form-', '');
          cancelEdit(itemId);
        }
      });
    }
  });

  // Function to cancel edit mode and return to view mode
  function cancelEdit(itemId) {
    // Show view mode elements
    document.getElementById(`title-${itemId}`).style.display = 'inline';
    document.getElementById(`edit-btn-${itemId}`).style.display = 'inline';
    
    // Hide edit mode
    document.getElementById(`edit-form-${itemId}`).style.display = 'none';
  }

  // Add confirmation for delete (optional)
  document.querySelectorAll('.delete-form input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
      if (this.checked) {
        const itemText = this.closest('.list-group-item').querySelector('[id^="title-"]').textContent;
        if (confirm(`Are you sure you want to delete "${itemText.trim()}"?`)) {
          this.form.submit();
        } else {
          this.checked = false; // Uncheck if user cancels
          e.preventDefault();
        }
      }
    });
  });

  // Add animation when new items are added (if they appear)
  if (window.location.hash === '#new') {
    document.querySelector('.card-footer input')?.classList.add('highlight');
    setTimeout(() => {
      document.querySelector('.card-footer input')?.classList.remove('highlight');
    }, 2000);
  }