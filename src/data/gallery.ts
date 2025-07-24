interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryData {
  [key: string]: GalleryImage[];
}

export const galleryImages: GalleryData = {
  'Equipment Trailer': [],
  'Enclosed 8.5x20 Trailer': [
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/back.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9iYWNrLmpwZyIsImlhdCI6MTc0MzcyOTM2NCwiZXhwIjoyMzc0NDQ5MzY0fQ.rSnUqlj1Zss4ui3AakXSJ3_gtiSt9w3pAF-SxG07a8E',
      alt: 'Enclosed trailer back view'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/enclosed-door.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9lbmNsb3NlZC1kb29yLmpwZyIsImlhdCI6MTc0MzcyODg4MiwiZXhwIjoyMzc0NDQ4ODgyfQ.iuWRupKD4ebl28dK9agmQOplxlLFRoFIrzzhBbihDBQ',
      alt: 'Enclosed trailer door'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/enclosed-front.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9lbmNsb3NlZC1mcm9udC5qcGciLCJpYXQiOjE3NDM3Mjg5MjEsImV4cCI6MjM3NDQ0ODkyMX0.Rf5rIV892JVyFvLeDgmTHHIyagKVA7DW_OqOxnJM_nc',
      alt: 'Enclosed trailer front view'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/enclosed-left.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9lbmNsb3NlZC1sZWZ0LmpwZyIsImlhdCI6MTc0MzcyODk3MSwiZXhwIjoyMzc0NDQ4OTcxfQ.d3lHxC5pSNSssqDdN98-p7wrLTosrR79MgywF-LF0BA',
      alt: 'Enclosed trailer left side'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/enclosed-ramp.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9lbmNsb3NlZC1yYW1wLmpwZyIsImlhdCI6MTc0MzcyODk5NywiZXhwIjoyMzc0NDQ4OTk3fQ.6Xfd0GnSFdQ3anidfpvLVMo5J7OnYqkcEA7yA2DC33M',
      alt: 'Enclosed trailer ramp'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/Enclosed/enclosed-winch.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy9FbmNsb3NlZC9lbmNsb3NlZC13aW5jaC5qcGciLCJpYXQiOjE3NDM3MjkwMjUsImV4cCI6MjM3NDQ0OTAyNX0.xivYNFiT0h0Kfp_YknKH9Cvc88aQJ-A_UF1gz9gsPpw',
      alt: 'Enclosed trailer winch'
    }
  ],
  '10K Car Trailer': [
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K/10Kramps1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEsvMTBLcmFtcHMxLmpwZyIsImlhdCI6MTc0NTU0MDc1MywiZXhwIjoxNzc3MDc2NzUzfQ.tSlihlUdbCNHMLfFSucnF60NOQTgxSIHmPn0--0krvQ',
      alt: '10K Car Trailer with ramps'
    },
   
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K/Back1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEsvQmFjazEuanBnIiwiaWF0IjoxNzQ1NTQwODc3LCJleHAiOjE3NzcwNzY4Nzd9.w-d4K5Sf-aNcaMsll8r_HhrheuaWQEhLQEqZ_jnN_Ow',
      alt: '10K Car Trailer rear view'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K/10K%20with%20roller.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEsvMTBLIHdpdGggcm9sbGVyLmpwZyIsImlhdCI6MTc0NDY4MTMzNSwiZXhwIjoyMzc1NDAxMzM1fQ.XD8fPsTPc49SicaNJ_JNMguuUUksZUXKaHs0QpB-zK4',
      alt: '10K Car Trailer with roller equipment'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K/10K%20with%20explorer2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEsvMTBLIHdpdGggZXhwbG9yZXIyLmpwZyIsImlhdCI6MTc0NDY4MTI3NiwiZXhwIjoyMzc1NDAxMjc2fQ.hD__eHtBBs3FkdMESf17-IQu0Iyw9HF2gnChIvGDpA8',
      alt: '10K Car Trailer with Ford Explorer - Front View'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/10K/10K%20with%20explorer.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy8xMEsvMTBLIHdpdGggZXhwbG9yZXIuanBnIiwiaWF0IjoxNzQ0NjgxMzExLCJleHAiOjIzNzU0MDEzMTF9.jo9GDQRahCfx1jUNgR4aFPJvgeWjuKLTO3qX9UlYslY',
      alt: '10K Car Trailer with Ford Explorer - Side View'
    }
  ],
  '7X14 Utility Trailer': [
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/7x14%20front.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0Lzd4MTQgZnJvbnQuanBnIiwiaWF0IjoxNzQzNzI5NjU0LCJleHAiOjIzNzQ0NDk2NTR9.tQ8MpnYivnrO6C0E351_DHRhjzdRE718NnAaPCusac4',
      alt: '7X14 Utility Trailer front view'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/7x14%20rear.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0Lzd4MTQgcmVhci5qcGciLCJpYXQiOjE3NDM3Mjk3MTgsImV4cCI6MjM3NDQ0OTcxOH0.Xt2ARMKg7ZFG25ktXvidPuGuCsu_tH5-1OTtD3U3iyk',
      alt: '7X14 Utility Trailer rear view'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/7x14%20right.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0Lzd4MTQgcmlnaHQuanBnIiwiaWF0IjoxNzQzNzI5NzQzLCJleHAiOjIzNzQ0NDk3NDN9.cCRmQVhD8iOAxEL92IkaP0QOy23J_ybgoO50SwgJ564',
      alt: '7X14 Utility Trailer right side'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/SXS.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0L1NYUy5wbmciLCJpYXQiOjE3NDM3MzAyNzAsImV4cCI6MjM3NDQ1MDI3MH0.zf99_gfyXqQt_yxgiJVtRhNdCdBRO3-k8lQYBYq63vg',
      alt: '7X14 Utility Trailer with SXS'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/house%20stuff.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0L2hvdXNlIHN0dWZmLmpwZyIsImlhdCI6MTc0MzczMDI5MiwiZXhwIjoyMzc0NDUwMjkyfQ.0i566DvqxKkaZJuUmTz0pQcA8iV9xfUoKId8ARthejo',
      alt: '7X14 Utility Trailer loaded with household items'
    },
    {
      src: 'https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/sign/trailer-images/7X14/utility%20with%20lumber.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFpbGVyLWltYWdlcy83WDE0L3V0aWxpdHkgd2l0aCBsdW1iZXIuanBnIiwiaWF0IjoxNzQ0NjgxNDM4LCJleHAiOjIzNzU0MDE0Mzh9.e4tdwFs-KG5iLEjCcg0jYJGLMCMX-jWgcwfiUohBNY0',
      alt: '7X14 Utility Trailer loaded with lumber'
    }
  ]
};