package TravelBooking.features.ai.service;

import java.util.Map;

import TravelBooking.features.ai.dto.ForecastChartDTO;

public interface DemandForecastService {

    Map<String, Object> runAIPipeline();

    ForecastChartDTO getChartDataByTour(Long tourId);

}
