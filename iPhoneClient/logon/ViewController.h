//
//  ViewController.h
//  logon
//
//  Created by Yan Wang on 12/23/13.
//  Copyright (c) 2013 Yan Wang. All rights reserved.
//

#import "AFNetworking.h"
#import "ZBarSDK.h"
#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <ZBarReaderDelegate>
{
    BOOL isLoaded;
}

@property (weak, nonatomic) IBOutlet UILabel *maintext;

@end
