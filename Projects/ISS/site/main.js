function fetchISSLocation(){
    fetch('/api')
      .then(response => response.json())
      .then(data => updateVisualization(data))
      .catch(error => console.error('Error fetching ISS location:', error));
}