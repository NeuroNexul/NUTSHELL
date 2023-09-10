Import("env")
import gzip
import os

'''
    Compress every file in the SPIFFS image with gzip
'''
def compress_spiffs(source, target, env):
    print("Compressing SPIFFS image...")
    for root, dirs, files in os.walk("data"):
        for file in files:
            if file.endswith(".gz"):
                continue
            file_path = os.path.join(root, file)
            with open(file_path, 'rb') as f_in:
                with gzip.open(file_path + ".gz", 'wb') as f_out:
                    f_out.writelines(f_in)
            os.remove(file_path)

def before_build_spiffs(source, target, env):
    print("Building React App...")
    env.Execute("cd web && npm run build")
    print("React App built!")

    print("Removing old SPIFFS image...")
    env.Execute("rm -rf data")

    print("Copying React App to SPIFFS...")
    env.Execute("cp -r web/dist data")

    compress_spiffs(source, target, env)

env.AddPreAction("$BUILD_DIR/spiffs.bin", before_build_spiffs)

# compress_spiffs(None, None, None)