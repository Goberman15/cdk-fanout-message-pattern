import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions'

export class MessagingFanoutStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue1 = new sqs.Queue(this, 'fanout-queue-1', {
      queueName: 'fanout-queue-1'
    });

    const queue2 = new sqs.Queue(this, 'fanout-queue-2', {
      queueName: 'fanout-queue-2'
    });

    const topic = new sns.Topic(this, 'fanout-topic', {
      topicName: 'fanout-topic',
      displayName: 'fanout-topic'
    });

    topic.addSubscription(new subs.SqsSubscription(queue1));
    topic.addSubscription(new subs.SqsSubscription(queue2));

    new CfnOutput(this, 'topicArn', {
      value: topic.topicArn
    });
  }
}
