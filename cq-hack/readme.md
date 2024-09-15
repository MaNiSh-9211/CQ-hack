open postman 
select post request
select body --raw then JSON
and put the object there

{
  "question": "What is the capital of india?"
}

http://localhost:9000/question_6


2 select the get req 
http://localhost:9000/answer_6




cloudflared tunnel --url http://localhost:3000
 e.g   https://sociology-launched-wherever-common.trycloudflare.com


java code for post request


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://cathedral-ecological-hazards-clan.trycloudflare.com/question_22"))
                .POST(HttpRequest.BodyPublishers.ofString("{\"question\":\"in a single paragraph give me code for implementing my own array list in java, the response must be a plain text message with each line separated by next line character don't give the code in a separate block it must be a plain text format.\"}", StandardCharsets.UTF_8))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response.body());
    }
}




get



import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://cathedral-ecological-hazards-clan.trycloudflare.com/answer_22");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();
                
                // Reading response line by line
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                
                // Manually parsing the response to extract the "answer" field
                String responseStr = response.toString();
                String startKey = "\"answer\":\"";
                String endKey = "\"}";
                
                int startIndex = responseStr.indexOf(startKey) + startKey.length();
                int endIndex = responseStr.lastIndexOf(endKey);
                
                if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                    // Extract the 'answer' value
                    String answer = responseStr.substring(startIndex, endIndex);
                    
                    // Replace escaped new line characters (\n) with actual new lines
                    String[] lines = answer.split("\\\\n");
                    
                    // Print each line stored in the array
                    for (int i = 0; i < lines.length; i++) {
                        System.out.println(lines[i]);
                    }
                } else {
                    System.out.println("Failed to parse the 'answer' field.");
                }
            } else {
                System.out.println("Failed to fetch the API response.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}




blackbox get with timelimit exided


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://cathedral-ecological-hazards-clan.trycloudflare.com/answer_22");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                System.out.println("Response: " + response.toString());
            } else {
                System.out.println("Failed to fetch the API response.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}