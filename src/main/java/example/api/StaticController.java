package example.micronaut.api;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.server.types.files.StreamedFile;

import java.io.InputStream;

@Controller("/")
public class StaticController {

    @Get(produces = MediaType.TEXT_HTML)
    public HttpResponse<StreamedFile> index() {
        InputStream inputStream = getClass().getResourceAsStream("/static/index.html");
        return HttpResponse.ok(new StreamedFile(inputStream, MediaType.TEXT_HTML));
    }
}
