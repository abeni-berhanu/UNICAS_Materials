import os
import json

def get_directory_structure(directory_path):
    directory_dict = {}
    
    for entry in os.listdir(directory_path):
        if entry[0] == '.' or entry == "src" or entry == "index.html" or entry == "directory.html":
            continue
        entry_path = os.path.join(directory_path, entry)
        if os.path.isdir(entry_path):
            directory_dict[entry] = get_directory_structure(entry_path)
        else:
            directory_dict.setdefault("file", []).append(entry)
    
    return directory_dict

def main():
    current_path = os.getcwd()
    directory_path = os.path.dirname(current_path)
    if os.path.exists(directory_path) and os.path.isdir(directory_path):
        directory_structure = get_directory_structure(directory_path)
        
        with open('directory_structure.json', 'w') as json_file:
            json.dump(directory_structure, json_file, indent=4)
            print('Directory structure updated successfully')
    else:
        print("The specified path is not a directory.")

if __name__ == "__main__":
    main()
