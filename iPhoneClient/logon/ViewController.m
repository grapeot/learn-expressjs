//
//  ViewController.m
//  logon
//
//  Created by Yan Wang on 12/23/13.
//  Copyright (c) 2013 Yan Wang. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidAppear:(BOOL)animated
{
    if (!isLoaded)
    {
        ZBarReaderViewController *reader = [ZBarReaderViewController new];
        reader.readerDelegate = self;
        [reader.scanner setSymbology: ZBAR_QRCODE
                              config: ZBAR_CFG_ENABLE
                                  to: 1];
        reader.readerView.zoom = 1.0;
        [self presentViewController: reader animated: YES completion:nil];
        isLoaded = true;
    }
    
}

- (void) imagePickerController: (UIImagePickerController*) reader didFinishPickingMediaWithInfo: (NSDictionary*) info
{
    //  get the decode results
    id<NSFastEnumeration> results = [info objectForKey: ZBarReaderControllerResults];
    
    ZBarSymbol *symbol = nil;
    for(symbol in results)
        break;
    // dismiss the controller
    [reader dismissViewControllerAnimated:YES completion:nil];
    NSLog(symbol.data);
    
    // Register the device to a new group
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    [manager setResponseSerializer:[AFHTTPResponseSerializer serializer]];
    AFHTTPRequestOperation *operation = [manager GET:symbol.data parameters:nil
                                             success:^(AFHTTPRequestOperation *operation, id responseObject) {
                                                 [_maintext setText:@"Succeeded. Please check the desktop page."];
                                             } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                                                 [_maintext setText:[NSString stringWithFormat:@"Failed. %@", error]];
                                             }];
    [operation start];
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
