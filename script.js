const frequencySelect = document.getElementById('frequency');
const intervalInput = document.getElementById('interval');
const intervalUnit = document.getElementById('interval-unit');
const weekdayOptions = document.getElementById('weekday-options');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const previewList = document.getElementById('preview');
const generateButton = document.getElementById('generate');

// Update interval unit and show/hide weekday checkboxes
frequencySelect.addEventListener('change', () => {
  const value = frequencySelect.value;

  if (value === 'daily') intervalUnit.textContent = 'day(s)';
  else if (value === 'weekly') intervalUnit.textContent = 'week(s)';
  else if (value === 'monthly') intervalUnit.textContent = 'month(s)';
  else if (value === 'yearly') intervalUnit.textContent = 'year(s)';

  weekdayOptions.classList.toggle('hidden', value !== 'weekly');
});

generateButton.addEventListener('click', () => {
  const frequency = frequencySelect.value;
  const interval = parseInt(intervalInput.value);
  const startDate = new Date(startDateInput.value);
  const endDate = endDateInput.value ? new Date(endDateInput.value) : null;

  const weekdays = Array.from(weekdayOptions.querySelectorAll('input:checked')).map(input => parseInt(input.value));

  const result = [];

  if (isNaN(startDate)) {
    alert('Please enter a valid start date');
    return;
  }

  let currentDate = new Date(startDate);

  while (!endDate || currentDate <= endDate) {
    if (frequency === 'daily') {
      result.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    } else if (frequency === 'weekly') {
      for (let i = 0; i < 7; i++) {
        const temp = new Date(currentDate);
        temp.setDate(currentDate.getDate() + i);
        if (weekdays.includes(temp.getDay()) && (!endDate || temp <= endDate)) {
          result.push(new Date(temp));
        }
      }
      currentDate.setDate(currentDate.getDate() + 7 * interval);
    } else if (frequency === 'monthly') {
      result.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + interval);
    } else if (frequency === 'yearly') {
      result.push(new Date(currentDate));
      currentDate.setFullYear(currentDate.getFullYear() + interval);
    }
  }

  // Update preview
  previewList.innerHTML = '';
  result.forEach(date => {
    const li = document.createElement('li');
    li.textContent = date.toDateString();
    previewList.appendChild(li);
  });
});
