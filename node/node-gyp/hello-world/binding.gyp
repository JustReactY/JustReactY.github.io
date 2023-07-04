{
  'targets': [{
    'target_name': 'electron-enhance',
    'include_dirs': [
      "<!@(node -p \"require('node-addon-api').include\")",
    ],
    'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
    'cflags!': ['-fno-exceptions'],
    'cflags_cc!': ['-fno-exceptions'],
    'conditions': [
      ['OS=="win"', {
        'defines': [
          '__WIN32=true'
        ],
        'libraries': [
          '-liphlpapi',
        ],
        'sources': [
          'hello.cc',
        ],
        'msvs_settings': {
          'VCCLCompilerTool': {
            'ExceptionHandling': 1
          },
        }
      }],
      ['OS=="mac"', {
        'defines': [
          '__DARWIN=true'
        ],
        'sources': [
          'hello.cc',
        ],
        'cflags+': ['-fvisibility=hidden'],
        'xcode_settings': {
          'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',
          'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
          'OTHER_CFLAGS': [
            '-ObjC++',
            '-Wno-format-security'
          ],
          'CLANG_CXX_LIBRARY': 'libc++',
          'MACOSX_DEPLOYMENT_TARGET': '10.7'
        },
        'libraries': [
          '-framework Foundation',
          '-framework AppKit',
          '-lobjc',
          '-framework IOKit',
          '-lz',
        ],
      }]
    ]
  }]
}