package TravelBooking.features.ai.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TravelBooking.features.ai.service.DemandForecastService;

@RestController
@RequestMapping("/api/ai")
public class AIForecastController {

    @Autowired
    private DemandForecastService demandForecastService;

    @PostMapping("/run-pipeline")
    public ResponseEntity<?> runAIPipeline() {
        Map<String, Object> result = demandForecastService.runAIPipeline();
        return ResponseEntity.ok(result);

    }
}
