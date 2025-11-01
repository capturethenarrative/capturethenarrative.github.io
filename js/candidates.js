document.addEventListener('DOMContentLoaded', function() {
    const candidateCards = document.querySelectorAll('.candidate-card');
    let flipped = false;

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.2;

        candidateCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                if (!flipped) {
                    card.classList.add('flipped');
                }
            } else {
                card.classList.remove('flipped');
                flipped = false;
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});


    document.addEventListener('DOMContentLoaded', function() {
      // Poll data
      const pollData = {
        labels: ['Poll 0', 'Poll 1', 'Poll 2', 'Poll 3', 'Poll 4'],
        marina: [50.00, 45.82, 53.55, 45.45, 48.84],
        victor: [50.00, 54.18, 46.45, 54.55, 51.16]
      };

      // Keep track of chart instances
      let pollChart = null;
      let electionChart = null;
      let alternativeChart = null;

      // Chart creation functions
      const createPollChart = (canvas) => {
        if (pollChart) return pollChart;
        pollChart = new Chart(canvas, {
          type: 'line',
          data: {
            labels: pollData.labels,
            datasets: [{
              label: 'Marina Castillo',
              data: pollData.marina,
              borderColor: '#3F67C7',
              backgroundColor: 'rgba(63, 103, 199, 0.1)',
              fill: true,
              tension: 0.4
            }, {
              label: 'Victor Hawthorne',
              data: pollData.victor,
              borderColor: '#E85E57',
              backgroundColor: 'rgba(232, 94, 87, 0.1)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart'
            },
            scales: {
              y: {
                min: 40,
                max: 60,
                title: {
                  display: true,
                  text: 'Support (%)'
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      };

      const createElectionChart = (canvas) => {
        if (electionChart) return electionChart;
        electionChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: ['Election Results (%)'],
            datasets: [{
              label: 'Marina Castillo',
              data: [48.72],
              backgroundColor: '#3F67C7',
              barThickness: 35
            }, {
              label: 'Victor Hawthorne',
              data: [51.28],
              backgroundColor: '#E85E57',
              barThickness: 40
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart'
            },
            scales: {
              x: {
                stacked: true,
                min: 0,
                max: 100
              },
              y: {
                stacked: true
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      };

      const createAlternativeChart = (canvas) => {
        if (alternativeChart) return alternativeChart;
        alternativeChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: ['Election Results (%)'],
            datasets: [{
              label: 'Marina Castillo',
              data: [50.5],
              backgroundColor: '#3F67C7',
              barThickness: 40
            }, {
              label: 'Victor Hawthorne',
              data: [49.5],
              backgroundColor: '#E85E57',
              barThickness: 35
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart'
            },
            scales: {
              x: {
                stacked: true,
                min: 0,
                max: 100
              },
              y: {
                stacked: true
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      };

      // Track initialized charts
      const initializedCharts = new Set();

      // Intersection Observer for charts
      const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const canvas = container.querySelector('canvas');
            
            if (!canvas) return;
            
            // Add visibility class
            container.classList.add('visible');

            // Initialize the appropriate chart
            requestAnimationFrame(() => {
              switch (canvas.id) {
                case 'pollChart':
                  createPollChart(canvas);
                  break;
                case 'electionChart':
                  createElectionChart(canvas);
                  break;
                case 'alternativeChart':
                  createAlternativeChart(canvas);
                  break;
              }
            });

            // Stop observing once initialized
            chartObserver.unobserve(container);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px'
      });

      // Start observing chart containers
      document.querySelectorAll('.poll-chart-container, .election-chart-container').forEach(container => {
        chartObserver.observe(container);
      });

      // Victory banner animations
      const bannerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            bannerObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '-50px'
      });

      // Observe victory banners
      document.querySelectorAll('.victory-banner').forEach(banner => {
        bannerObserver.observe(banner);
      });
    });
