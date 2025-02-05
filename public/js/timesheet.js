class TimesheetManager {
    constructor() {
        this.webcam = null;
        this.canvas = document.getElementById('canvas');
        this.initializeWebcam();
        this.initializeFingerprint();
        this.bindEvents();
    }

    async initializeWebcam() {
        const video = document.getElementById('webcam');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            this.webcam = video;
        } catch (error) {
            console.error('Webcam access failed:', error);
        }
    }

    initializeFingerprint() {
        // Initialize fingerprint scanner SDK here
        // This will depend on your hardware/SDK choice
    }

    capturePhoto() {
        const context = this.canvas.getContext('2d');
        this.canvas.width = this.webcam.videoWidth;
        this.canvas.height = this.webcam.videoHeight;
        context.drawImage(this.webcam, 0, 0);
        return this.canvas.toDataURL('image/jpeg');
    }

    bindEvents() {
        document.getElementById('clockIn').addEventListener('click', () => this.recordTime('clock_in'));
        document.getElementById('breakStart').addEventListener('click', () => this.recordTime('break_start'));
        document.getElementById('lunchStart').addEventListener('click', () => this.recordTime('lunch_start'));
        document.getElementById('clockOut').addEventListener('click', () => this.recordTime('clock_out'));
    }

    async recordTime(action) {
        const employeeId = document.getElementById('employeeId').value;
        const photo = this.capturePhoto();
        
        const data = {
            employee_id: employeeId,
            action: action,
            photo: photo,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/timesheet/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                this.updateTimeline();
            }
        } catch (error) {
            console.error('Failed to record time:', error);
        }
    }

    async updateTimeline() {
        // Fetch and display today's timeline
        const timeline = document.getElementById('timelineDisplay');
        // Update timeline display logic here
    }
}

new TimesheetManager();
