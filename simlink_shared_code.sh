SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJECTS_DIR_PATH="$SCRIPT_DIR/projects"
SHARED_CODE_DIR_PATH="$PROJECTS_DIR_PATH/shared"

declare -a projects=("dm-table" "dm-tags" "dm-uploader")
for project in "${projects[@]}"
do
    ln -sf "$SHARED_CODE_DIR_PATH" "$PROJECTS_DIR_PATH/$project/src"
done
