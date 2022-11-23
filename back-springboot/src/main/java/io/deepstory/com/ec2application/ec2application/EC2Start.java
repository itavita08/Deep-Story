package io.deepstory.com.ec2application.ec2application;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.StartInstancesRequest;
import com.amazonaws.services.lexruntime.model.BadRequestException;

@Component
public class EC2Start {

	@Value("${aws.instances.key.Id}")
	private String key;

	@Value("${aws.instances.secret.key}")
	private String secretKey;

	@Value("${aws.instances.instance.id}")
	private String instanceID;

	public void startInstances() {

		try {

			 final AWSCredentials AWS_CREDENTIALS;
			   
		        AWS_CREDENTIALS = new BasicAWSCredentials(
		                key,
		                secretKey
		        );
		  
		        AmazonEC2 ec2Client = AmazonEC2ClientBuilder.standard()
		                .withCredentials(new AWSStaticCredentialsProvider(AWS_CREDENTIALS))
		                .withRegion(Regions.AP_NORTHEAST_2)
		                .build();
		       
		        String instanecID = instanceID;
		        StartInstancesRequest startInstancesRequest = new StartInstancesRequest()
		                .withInstanceIds(instanecID);
		        
		        ec2Client.startInstances(startInstancesRequest)
		                .getStartingInstances()
		                .get(0)
		                .getPreviousState()
		                .getName();
		        
		        System.out.println("Start the Instnace with ID: "+instanecID);
		   

		} catch (Exception e) {

			System.out.println(e.getMessage());

			throw new BadRequestException("Start Instance 실패   -  " + e.getMessage());

		}

	}

}
