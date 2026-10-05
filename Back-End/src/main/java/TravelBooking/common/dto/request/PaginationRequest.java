package TravelBooking.common.dto.request;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginationRequest {

    private int page = 0;
    private int size = 6;
    private String sortby = "id";

    public Pageable toPageable() {
        String sortField = (sortby != null && !sortby.trim().isEmpty()) ? sortby : "id";
        return PageRequest.of(Math.max(0, page), size > 0 ? size : 6, Sort.by(sortField).descending());
    }
}
