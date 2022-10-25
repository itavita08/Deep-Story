import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectController {
	
	@PostMapping(value="/test" )
	public String test01(@RequestBody String inputData) {
		String data = inputData;
		System.out.println(data);
		if (data != null) {
			return "success!";
		}else {
			return "problem!";
		}
	}
}
