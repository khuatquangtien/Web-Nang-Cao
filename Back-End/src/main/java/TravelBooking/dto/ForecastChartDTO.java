package TravelBooking.dto;

import java.util.List;

public class ForecastChartDTO {
    private List<String> labels;            // Ví dụ: ["06/2026", "07/2026", "08/2026"]
    private List<Integer> predictedData;    // Ví dụ: [120, 150, 90]
    private List<Integer> actualData;       // Ví dụ: [115, 160, null] (Tháng chưa diễn ra trả về null)
    private Double mae;
    private Double r2Score;
    
    public Double getMae() {
		return mae;
	}

	public void setMae(Double mae) {
		this.mae = mae;
	}

	public Double getR2Score() {
		return r2Score;
	}

	public void setR2Score(Double r2Score) {
		this.r2Score = r2Score;
	}

	public ForecastChartDTO(List<String> labels, List<Integer> predictedData, List<Integer> actualData) {
        this.labels = labels;
        this.predictedData = predictedData;
        this.actualData = actualData;
    }

    // --- GETTER AND SETTER ---
    public List<String> getLabels() { return labels; }
    public void setLabels(List<String> labels) { this.labels = labels; }

    public List<Integer> getPredictedData() { return predictedData; }
    public void setPredictedData(List<Integer> predictedData) { this.predictedData = predictedData; }

    public List<Integer> getActualData() { return actualData; }
    public void setActualData(List<Integer> actualData) { this.actualData = actualData; }
}