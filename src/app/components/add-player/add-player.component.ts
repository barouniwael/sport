import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PlayerService } from "src/app/services/player.service";

@Component({
  selector: "app-add-player",
  templateUrl: "./add-player.component.html",
  styleUrls: ["./add-player.component.css"],
})
export class AddPlayerComponent implements OnInit {
  playerForm: FormGroup;
  id: any;
  player: any;
  imagePreview :string;
  title: string = "Add Player";
  constructor(
    private fb: FormBuilder,
    private Act: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.Act.snapshot.paramMap.get("id");
    if (this.id) {
      this.title = "Edit Player";
    }
    this.playerForm = this.fb.group({
      id: [""],
      name: [""],
      age: [""],
      position: [""],
      nbr: [""],
      img:[''],
    });
    let players = JSON.parse(localStorage.getItem("players") || "[]");

    for (let i = 0; i < players.length; i++) {
      if (players[i].id == this.id) {
        //remplir le formulaire
        this.player = players[i];
        break;
      }
    }
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(event);
    this.playerForm.patchValue({img: file });
    this.playerForm.updateValueAndValidity();
    console.log("playerform",this.playerForm);
    const reader = new FileReader();
    console.log("reader",reader);
    reader.onload = () => {
      this.imagePreview = reader.result as string
     
    };
    reader.readAsDataURL(file);
  }
  addPlayer() {
    //console.log("here player",this.playerForm.value);
    //  let players= JSON.parse(localStorage.getItem("players")||"[]");
    //  let playerId= JSON.parse(localStorage.getItem("playerId")||"1");
    //  this.playerForm.value.id=playerId;
    //  players.push(this.playerForm.value);
    //  localStorage.setItem("players",JSON.stringify(players));
    //  localStorage.setItem("playerId",playerId + 1);
    this.playerService.addPlayer(this.playerForm.value,this.playerForm.value.img).subscribe((data) => {
      if (data.doc) {
        this.router.navigate(["/admin"]);
      }
    });
  }
}
