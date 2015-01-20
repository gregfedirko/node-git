

##Functions:

### add

* creates a blob for a given file in the object store
* writes appropriate files to the index
  * changing the hash for any file, will cause affected tree hashes to be removed

### commit 

* parses the index file and creates tree objects as appropriate
* these the final root tree is then used to generate a commit object


parsing the Index file into an in-memory object is required for: 
  * recursively building tree objects
  * recursively building the working directory


Build the index file from a commit:
  * tree object pointers must be followed down to leaves, contents can all be added to the index file



## Important file formats:

index.json

json nested document, analogous to the in memory object of the tree



















