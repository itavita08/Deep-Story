package io.deepstory;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.StopInstancesRequest;
import com.amazonaws.services.lexruntime.model.BadRequestException;

@SpringBootTest
class DeepStoriesApplicationTests {

	@Value("${aws.instances.key.Id}")
	private String key;

	@Value("${aws.instances.secret.key}")
	private String secretKey;

	@Value("${aws.instances.instance.id}")
	private String instanceID;
	
	@Test
	public void stopInstances() {

		try {

			final AWSCredentials AWS_CREDENTIALS;

			AWS_CREDENTIALS = new BasicAWSCredentials(key,
					secretKey);

			AmazonEC2 ec2Client = AmazonEC2ClientBuilder.standard()
					.withCredentials(new AWSStaticCredentialsProvider(AWS_CREDENTIALS))
					.withRegion(Regions.AP_NORTHEAST_2).build();

			String instanecID = instanceID;
			StopInstancesRequest stopInstancesRequest = new StopInstancesRequest().withInstanceIds(instanecID);

			ec2Client.stopInstances(stopInstancesRequest).getStoppingInstances().get(0).getPreviousState().getName();

		} catch (Exception e) {

			throw new BadRequestException("Stop Instance 실패   -  " + e.getMessage());
		}
	}
	
}
