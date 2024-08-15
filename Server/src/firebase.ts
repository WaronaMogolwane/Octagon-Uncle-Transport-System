// lib/firebase.ts
import admin from "firebase-admin";

export const firebaseConfig = {
    credential: admin.credential.cert({
        "projectId": "octagon-uncle",
        "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdpdixYpb3ce5d\nGDlbf5yboOz+xtcTloVdjS1dtwwmNSgXskTRrtpWK9p18KOconAniTEEdnfszbgP\nBdw9ghZ63I6tvD6FWyV0pcyWTeQreKzcoxbzSQ6vqimAavXUgAgRlwg73TIxEZdP\n1E7DyZcmpZkMOvxyXgQWm1uxWkXO6VengoQrysxIdK/dYNoNCKLSN8sGu+j7ngen\nACW7WGbeX/913weBoN3Yd1flwlCSSLEcgIAymnvqp4zOVJS8g40uWmDEoNahKZQt\n+i3/zICWiO/CAcRIcegRIuk8CyYriXCgBsS0Mjo3FBoDolwk0mCLdtmkdXs2sWU+\n/ehcXHhnAgMBAAECggEAFkuQsFGNoTQjLlZRMlADYX0qV0Pewf3tIZRoQJM1LCgj\nYeqL0g3FAh/Ulw5vzSSp8OV1obhxcHONns5I3ggKTtjncsmnG+wOiYczPmSIqt83\nr0J/aevAoHZTxT4bQzDSM06lUvYO9aKTwC3577WQY15THUgwUKpcMKhLGPN34PGl\nNqPEi2dGn4Cpi3E4GZk18D7Txb8VM+KvaPZA/rAZmgvb462gdt0PGAMfXxIiOJQT\nuvf1Pi4aE0IYQqfp8mcSrL6RWC8BVzUveshIv2IPMHmOYWWIDSTjMN2Huyx1/bGt\nNxts9I1KGIOLOCP+6O0X/5Ef7Y9wNU4j98AZl2hU+QKBgQDacsSn1Xixxa6i6An+\nAr8wI+cRoZACB258vRhmlE6jAwWj2bEws3gZbhWn2qKAp56Cc/5DpJ3veRwnsbPA\nCfaQQb3+aH9FBAmRWG1eP3UpPoYkm54cxffTG+ZPXD7Bhlx8A2pWWc0zguyCAdFq\nXOsxVdhMPDOugowAuRjf8eY0bwKBgQC4v3AsUjzj7NePh/SAgtduBzDH2jsbznIL\nYtY5A/Ujbu4WZ/LIXC7ROr6CZTVK9bfxSMx5dDF9bAB9xRurfisEI2Opx4YGDj5q\nfpuBOMkQ+tObqG3ARDxlbFDtUt+nYr5ryT3l/dwCzQXj8cNFXMp5nU2VTTTdp+oV\nhI2eWmqniQKBgBgsIv6/bH+fdFeqfZCSFT3qeyNEUX8n+13qPsz7FEiNiQ48hJLz\nCRMnT1Ynp1u9MJkW5Mfva1qYeDkcPNu/Pn1wCOoh/hNRAw4GTvPi6cAKnyVl4vUk\nIuxFZhLaDkez6n/+kMHFZiORFUK9mMLATXZEHY8yCjYBVCSwVsRRLDwZAoGAOuiH\n+wnp8n9VqKWgN84ApUvTqRYT3OTyBmFoj1uMsdSwRCK3Dl4ea4bAslFVMeax1VTy\nJhP/p89lRLUyAnfDfZlPMRa2zH2EN27RZN3XdvuTt8F35WOconZsQ5A2Umgw8auE\nei59FcOMCkfPjPFuemLHF0E8ByWAhYXzpjeMZIkCgYEAxPNXXrDl+gO03M3h6jqC\n8VjBKUyvx29p9dit2M4UbNWUMszh//2u7qSpDhw9Oz+Quw8LOCiXPRu1U+S63nkx\n0xidM/NHLOuJpjogNIRVatTRmHW+Vh66ES3httRE/PbiawT2DBrrcvKz16MKz381\nEcqXGqSLEd1haGIdExF4SEY=\n-----END PRIVATE KEY-----\n",
        "clientEmail": "firebase-adminsdk-v63eb@octagon-uncle.iam.gserviceaccount.com",
    }

    ),
};

export const firebase = admin.apps.length
    ? admin.app()
    : admin.initializeApp(firebaseConfig);